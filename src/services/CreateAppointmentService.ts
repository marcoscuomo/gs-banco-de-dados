import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository){
        this.appointmentRepository = appointmentRepository;
    }

    public execute({date, provider}: RequestDTO): Appointment {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw Error('This appointment is already booked');
        }


        /* Retirado para utlizar a classe AppointmentRepository */
        // const appointment = {
        //     id: uuid(),
        //     provider,
        //     date: parseDate,
        // };

        const appointment = this.appointmentRepository.create({provider, date: appointmentDate});

        return appointment;

    }
}

export default CreateAppointmentService;
