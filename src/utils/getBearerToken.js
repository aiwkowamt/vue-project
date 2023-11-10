import axios from 'axios';

const clientId = '958faba0ce2d48cab0f7d49b9a23cd44';
const clientSecret = '2b48c768ad634eb289ab077e045f214c';
const authString = `${clientId}:${clientSecret}`;
const base64AuthString = btoa(authString);

let accessToken = getBearer();

async function getBearer() {
    try {
        const res = await axios.post('https://accounts.spotify.com/api/token', {
            grant_type: 'client_credentials'
        }, {
            headers: {
                'Authorization': `Basic ${base64AuthString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return res.data.access_token;
    } catch (error) {
        console.error('Error while requesting the token:', error);
    }
}

export { accessToken };