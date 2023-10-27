import axios from 'axios';

const clientId = '958faba0ce2d48cab0f7d49b9a23cd44';
const clientSecret = '2b48c768ad634eb289ab077e045f214c';
const authString = `${clientId}:${clientSecret}`;
const base64AuthString = btoa(authString);

const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');

let accessToken = getBearer();

function getBearer() {
    const res = axios
        .post('https://accounts.spotify.com/api/token', data, {
            headers: {
                'Authorization': `Basic ${base64AuthString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => {
            console.log(response.data.access_token);
            return response.data.access_token;
        })
        .catch(error => {
            console.error('Error while requesting the token:', error);
        });
    return res
}

export { accessToken };