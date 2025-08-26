import http from "node:http";
import { Resend } from "resend";

const resend = new Resend("${{RESEND_API_KEY}}");

const server = http.createServer(async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    html: "<strong>It works!</strong>",
  });

  res.setHeader("Content-Type", "text/plain");

  if (error) {
    console.error(error);
    res.statusCode = 500;
    return res.end(error.message);
  }
  res.statusCode = 200;
  res.end(`Email ID: ${data.id}`);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
