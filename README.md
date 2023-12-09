# ESP32 Energy Monitor

This project is a web application for monitoring and visualizing energy data collected from ESP32 devices. It leverages Next.js for the frontend and various other technologies to create an efficient and user-friendly energy monitoring platform.

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenAI API](https://beta.openai.com/docs/)
- [MongoDB](https://www.mongodb.com/)

## How to Use

### Use our project with your esp32 project

To create a new project based on this project clone this repo by using`git clone`, run the following command:

```bash
git clone https://github.com/siddhartha-up80/esp32energymonitor

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## ESP32 Integration

1. Connect your ESP32 and sensors to measure voltage, current, power, and energy.
2. Configure your ESP32 to yuor depolyed link to send energy data to the web application via the Internet.

## AI Suggestions

Add OpenAI Key to your environment variables and explore AI-generated suggestions based on the last 5 entries of voltage, current, power, and energy data.

## Clear History

Clear all historical energy data stored in the database by clicking the "Clear History" button.

