// pages/api/generateFO.js
export default async function handler(req, res) {
  const { updatedElement } = req.body;

  try {
    const response = await fetch(`https://foaas.dev${updatedElement}`, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
