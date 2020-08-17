/** 
 * Specs:
 * - Envelope: https://nodemailer.com/smtp/envelope/
 * - DSN (Delivery Status Notofication): https://nodemailer.com/smtp/dsn/
 *  - Attachments : https://nodemailer.com/message/attachments/
 *  - Callendar events methods: https://tools.ietf.org/html/rfc5546#section-1.4
 *  - Callendar events: https://nodemailer.com/message/calendar-events/
 *  ** In general it is not a good idea to add additional attachments to calendar messages as it might mess up the behavior of some email clients. Try to keep it only to **text**, **html** and **icalEvent** without any additional **alternatives** or **attachments** **
 *  - Embedded images: https://nodemailer.com/message/embedded-images/
*/

let message = {
    from: 'mailer@nodemailer.com', // listed in rfc822 message header
    to: 'daemon@nodemailer.com', // listed in rfc822 message header
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    cc: '',
    bcc: '',
    replyTo: '', // email address to reply to
    priority: '', // Sets message importance headers, either ‘high’, ‘normal’ (default) or ‘low’
    date: new Date(), // optional Date value, current UTC string will be used if not set
    attachments: [], // An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.
    envelope: { // is auto-generated and doesn't need to be set
        from: 'Daemon <deamon@nodemailer.com>', // used as MAIL FROM: address for SMTP
        to: 'mailer@nodemailer.com, Mailer <mailer2@nodemailer.com>', // used as RCPT TO: address for SMTP
        cc: 'mailer3@nodemailer.com, Mailer4 <mailer4@nodemailer.com>', // addresses from this value get added to RCPT TO list
        bcc: 'mailer5@nodemailer.com, Mailer6 <mailer6@nodemailer.com>' // addresses from this value get added to RCPT TO list
    },
    dsn: {
        id: 'some random message specific id', // is the envelope identifier that would be included in the response (ENVID) - WHAT?
        return: 'headers', // is either ‘headers’ or ‘full’. It specifies if only headers or the entire body of the message should be included in the response (RET)
        notify: ['success', 'failure', 'delay'], // is either a string or an array of strings that define the conditions under which a DSN response should be sent. Possible values are ‘never’, ‘success’, ‘failure’ and ‘delay’. The condition ‘never’ can only appear on its own, other values can be grouped together into an array (NOTIFY)
        recipient: 'sender@example.com' // notify sender
    },
    icalEvent: {
        filename: '', // optional filename, defaults to ‘invite.ics’
        method: '', // This should match the METHOD: value in calendar event file!. Optional method, case insensitive, defaults to ‘publish’. Other possible values would be ‘request’, ‘reply’, ‘cancel’ or any other valid calendar method listed in RFC5546.
        content: '', // is the event file, it can be a string, a buffer, a stream
        path: '', // is an alternative for content to load the calendar data from a file
        href: '', //  is an alternative for content to load the calendar data from an URL
        encoding: '' // defines optional content encoding, eg. ‘base64’ or ‘hex’. This only applies if the content is a string. By default an unicode string is assumed.
    }
};

