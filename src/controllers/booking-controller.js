const {BookingService} = require('../services/index');
const {StatusCodes} = require('http-status-codes')
const bookingService = new BookingService();
const {createChannel,publishMessage} = require('../utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('../config/serverConfig');


class BookingController {
    constructor() { 
    }
        async create (req,res) {
            try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.CREATED).json({
                message:"Successfully completed booking",
                success:true,
                error: {},
                data:response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message:error.message,
                success:false,
                error: error.explanation,
                data:{}
            })
        }
    }

    async sendMessageToQueue(req,res)  {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: 'This is a notificaion from queue',
                content: 'Some queue will subscribe this',
                recepientEmail: 'sardarjasprit3118@gmail.com',
                notificationTime:'2026-01-22T14:49:00.034Z'
            },
            service: 'CREATE_TICKET'
        };
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
        return res.status(200).json({
            message:"Successfully published the msg",
        })

    }

    async cancel (req,res)  {
        try {
            const response = await bookingService.cancelBooking(req.params.id);
            return res.status(StatusCodes.OK).json({
                message:"Successfully Cancelled booking",
                success:true,
                error: {},
                data:response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message:error.message,
                success:false,
                error: error.explanation,
                data:{}
            })
        }
    }

}

module.exports = BookingController;



