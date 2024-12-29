const express = require("express");
const fetch = require('node-fetch');
require('dotenv').config()

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
    res.send("Welcome to the Notion Query API!");
});

app.get("/query-notion-db", async (req, res) => {
    const VITE_NOTION_API_KEY = process.env.VITE_NOTION_API_KEY;
    const VITE_NOTION_QUOTES_DB = process.env.VITE_NOTION_QUOTES_DB;

    console.log(VITE_NOTION_API_KEY);
    console.log(VITE_NOTION_QUOTES_DB);


    try {
        const response = await fetch(
            `https://api.notion.com/v1/databases/${VITE_NOTION_QUOTES_DB}/query`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${VITE_NOTION_API_KEY}`,
                    "Content-Type": "application/json",
                    "Notion-Version": "2022-06-28",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
