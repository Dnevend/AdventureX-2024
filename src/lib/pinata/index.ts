const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkNTk3YmViMC0yM2FmLTQ1ODYtYTAxNi0xMmJmZGI2ZGFlOGIiLCJlbWFpbCI6ImRuZXZlbmRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNmOTQ4MDU5MjZkM2JlYTYyYTAwIiwic2NvcGVkS2V5U2VjcmV0IjoiOWM5MGNlNDdhYmM1ZDE1NTgwMTk1OTcwZmNiMDlmNWNlMDY1ZDJiYTZhMGFjOGY2MGNmNWM1M2ZjZWFhYjM0ZSIsImlhdCI6MTcyMTI4MTY5MH0.FoOzhmZbXNmnd1USOrOupksAqfqzyIC7rDb8RpY2hTA'

export const IPFS_GATEWAY = 'https://ipfs.io/ipfs/'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function pinJSONToIPFS(value: any) {
    try {
        const data = JSON.stringify(value)
        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JWT}`,
            },
            body: data,
        });

        const resData = await res.json();

        return resData
    } catch (error) {
        console.log(error);
    }
}