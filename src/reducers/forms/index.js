//Core
import { combineForms } from 'react-redux-form';

//Instruments
import { personalId } from '../../instruments/api';
export default combineForms(
    {
        signup: {
            firstName: '',
            lastName:  '',
            password:  '',
            email:     '',
            invite:    personalId,
        },
        login: {
            email:    '',
            password: '',
            remember: false,
        },
        user: {
            profile: {
                firstName: '',
                lastName:  '',
                avatar:    [],
            },
            password: {
                oldPassword: '',
                newPassword: '',
            },
        },
    },
    'forms'
);
