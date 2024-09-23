import { getAccessToken } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res);
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
}
