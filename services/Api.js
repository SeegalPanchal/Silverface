
export default class Api {

    constructor(){
        this.personGroupId = 99999
        this.headers = {'Ocp-Apim-Subscription-Key': 'f09f2f2554ec4d6391f58cf4de9d589d', 'Content-Type': 'application/json'}
        this.url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
        this.accessToken = '';
        
    } 

    sendMail = ( name, subject, data) => {
        const emails = {
            "Hi Jacob Haig": "jhaig343@gmail.com",
            "Hi Kamran Fekri": "fekri.kamran@gmail.com",
            "Hi Mitchell Van Braeckel": "mvanbrae@uoguelph.ca",
            "Hi Seegal Panchal": "djinnator1@gmail.com"
        }
        const endpoint = "https://outlook.office.com/api/v2.0/me/sendmail";
        const body = JSON.stringify({
            "Message": {
                "Subject": subject,
                "Body": {
                    "ContentType": "Text",
                    "Content": data
                },
                "ToRecipients": [
                    {
                        "EmailAddress": {
                            "Address": emails[name]
                        }
                    }
                ]
            },
            "SaveToSentItems": "false"
        });
        const headers = { 'Authorization': this.accessToken, 'Content-Type': 'application/json'};
        const method = 'post';

        return fetch(endpoint, {
            method,
            body,
            headers,
        })
        .then(response => console.log(response));
        
    }



    detectFace = (url) => {
        const endpoint = `${this.url}/detect`
        const body = JSON.stringify({ url })
        const headers = this.headers
        const method = 'post'

        return fetch(endpoint, {
            method,
            body,
            headers,
        })
        .then(response => response.json())
        .then(json => {
            if(json[0] !== undefined) {
                return json[0].faceId
            } else return null
        })
    }

    identifyFace = (faceId) => {
        const endpoint = `${this.url}/identify`
        const body = JSON.stringify({
            'personGroupId': this.personGroupId,
            'faceIds': [faceId],
            'maxNumOfCandidatesReturned': 1,
            'confidenceThreshold': 0.5
        })
        const headers = this.headers
        const method = 'post'

        return fetch(endpoint, {
            method,
            body,
            headers,
        })
        .then(response => response.json())
        .then(json => {
            if(json[0] !== undefined && json[0].candidates[0] !== undefined) {
                return json[0].candidates[0].personId
            } else return null
        })
    }

    getPersonName = (personId) => {
        const endpoint = `${this.url}/persongroups/${this.personGroupId}/persons/${personId}`
        const headers = this.headers
        const method = 'get'

        return fetch(endpoint, {
            method,
            headers,
        })
        .then(response => response.json())
        .then(json => {
            if(json !== undefined){
                return json.name
            } else return null
        })
    }

    uploadImage = (image) => {
        //console.log(image)
        const endpoint = 'https://api.imgur.com/3/image'
        const type = 'Base64'
        const body = JSON.stringify({
            image,
            type,
        })
        const headers = {
            Authorization: "Client-ID fea93584f138f1e",
            'Content-Type': "application/json"
        }
        const method = 'post'

        return fetch(endpoint, {
            method,
            body,
            headers,
        })
        .then(response => response.json())
        .then(json => {
            if(json.success){
                return json.data.link
            } else return null
        })       
    }

}