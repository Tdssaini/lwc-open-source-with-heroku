/* eslint-disable no-console */
// eslint-disable-next-line no-undef
const jsforce = require('jsforce');
require('dotenv').config();
const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}
const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});
module.exports = app => {
    app.get('/api/sessions', (req, res) => {
        const soql = `SELECT Id, Name, toLabel(Room__c), Description__c, format(Date_and_Time__c) formattedDateTime,
            (SELECT Speaker__r.Id, Speaker__r.Name, Speaker__r.Description, Speaker__r.Email, Speaker__r.Picture_URL__c FROM Session_Speakers__r)
            FROM Session__c ORDER BY Date_and_Time__c LIMIT 100`;
        conn.query(soql, (err, result) => {
            if (err) {
                res.sendStatus(500);
            } else if (result.records.length === 0) {
                res.status(404).send('Session not found.');
            } else {
                const formattedData = result.records.map(sessionRecord => {
                    let speakers = [];
                    if (sessionRecord.Session_Speakers__r) {
                        speakers = sessionRecord.Session_Speakers__r.records.map(
                            record => {
                                return {
                                    id: record.Speaker__r.Id,
                                    name: record.Speaker__r.Name,
                                    email: record.Speaker__r.Email,
                                    bio: record.Speaker__r.Description,
                                    pictureUrl: record.Speaker__r.Picture_URL__c
                                };
                            }
                        );
                    }
                    return {
                        id: sessionRecord.Id,
                        name: sessionRecord.Name,
                        dateTime: sessionRecord.formattedDateTime,
                        room: sessionRecord.Room__c,
                        description: sessionRecord.Description__c,
                        speakers
                    };
                });
                res.send({ data: formattedData });
            }
        });
    });
};
