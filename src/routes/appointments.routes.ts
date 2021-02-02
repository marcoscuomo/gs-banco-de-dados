import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import appointmentService from '../services/CreateAppointmentService';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();



/* Retirado após a criação da model */
// interface Appointment {
//     id: string;
//     provider: string;
//     date: Date;
// }

/* Retirado para utilização do AppoitentRepository */
// const appointments: Appointment[] = [];

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.listAll();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {

    try {
        const { provider, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService(appointmentRepository);

        const appointment = createAppointmentService.execute({date: parseDate, provider});

        return response.json(appointment);

    }catch(err){
        return response.status(400).json({error: err.message});
    }
});

export default appointmentsRouter;
