const express = require('express');
const Joi = require('joi')
Doctors = express.Router();

Doctors.get('/doctorsList', async (request, reply) => {
    await request.knex('select doc_name, doc_id, doc_special_in, doc_week_start, doc_week_end, doc_shift_start, doc_shift_end from doctors where starts = 1 ')
    .then(result => {
        error = false
        success = true
        data = result
        message = "Fetched Doctors list"
        reply.status(200).send({
            edc: commonFunction.encrypt(
                JSON.stringify({
                    statusCode: 200,
                    error: false,
                    success: true,
                    data: result,
                    message: 'List of available doctors'
                })
            )
        })        
    })
    .catch(catch_err => {
        reply.status(500).send({
            edc: commonFunction.encrypt(
                JSON.stringify({
                    error: true,
                    success: false,
                    data: [],
                    message: 'Unable to fetch data'
                })
            )
        })
    })
})


Doctors.get('/saveDoctorsList', async (request, reply) => {
    const schema = Joi.object().keys({
        doctor_name: Joi.string().required(),
        doc_special_in: Joi.string().required(),
        doc_week_start: Joi.number().required(), // 1-7
        doc_week_end: Joi.number().required(), // 1-7
        doc_shift_start: Joi.number().required(), // 1-24
        doc_shift_end: Joi.number().required(), // 1- 24
    })
    await Joi.validate(request.body, schema, async (err, resultJoi) => {
        if (err && err.details.length) {
            console.log('err', err)
            reply.status(400).send({
                edc: commonFunction.encrypt(
                    JSON.stringify({
                        success: false,
                        message: 'Invalid data'
                    })
                )
            })
        }
        console.log("result", resultJoi);
        await request.knex('Insert queryy')
        .then(result => {
            error = false
            success = true
            data = result
            message = "Doctor details saved"
            reply.status(200).send({
                statusCode: 200,
                error: false,
                success: true,
                data: result,
                message: 'List of available doctors'
            })        
        })
        .catch(catch_err => {
            reply.status(500).send({
                error: true,
                success: false,
                data: [],
                message: 'Unable to save details'
            })
        })
    })
})
module.exports = Doctors
