// pages/api/getUserData.js
import firebase from '../../config/firebase';

export default async function handler(req, res) {
  const { uid } = req.query; // UID of the user you want to fetch data for

  try {
    const userRecord = await firebase.auth().getUser(uid);
    res.status(200).json(userRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
}