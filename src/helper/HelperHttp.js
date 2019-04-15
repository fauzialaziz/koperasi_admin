import axios from 'axios'
import config from '../config/ConfigApi'
import local from '../config/ConfigLocal'
import HelperCookie from './HelperCookie';

export default {
    /**
     * @param {string} route - API Endpoint. Get listed routes in ConfigApi.ROUTE.
     * @param {string} method - HTTP Request method. Get listed methods in ConfigApi.METHOD.
     * @param {Object} json - Data in a form of Object to be sent to API.
     * @param {requestCallback} cb - Callback function that handle the response. common form : (success, response) => {...}
     * @callback requestCallback 
     * @param {boolean} success - Handle success response.
     * @param {Object} response - Handle response body data.
     */
    request: (route, method, json, cb) => {
        let option = {
            url: config.API_URL + route,
            method: method,
            headers: {},
            data: json
        }
        if (route === config.ROUTE.SIGN_IN){
            option.headers = {
                "Content-Type": config.HEADERS.conten_type,
                "ApplicationCode": config.HEADERS.application_code
            }
        }else{
            // if not Sign in, do this
            option.headers = {
                'Authorization': 'Bearer ' + HelperCookie.get(local.TOKEN),
                "Content-Type": config.HEADERS.conten_type
            }
            if (method === config.METHODS.PUT || method === config.METHODS.DEL) {
                option.url += '/' + json.Id
                option.headers['If-Match'] = json.Etag
                delete option.data.Id
                delete option.data.Etag
            }
        }
        debugger
        axios(option)
        .then(res => {
            debugger
            if(method === config.METHODS.GET && res.headers.etag) {
                res.data.Result['Etag'] = res.headers.etag
            }
            cb(res.data.IsSuccess, res.data)
        })
        .catch(err => {
            debugger
            if(err.response === undefined){  
                cb(false, { Message: 'Lost connection with server.' })
            }else{
                cb(false, err.response.data)
            }
        })
    }
}
