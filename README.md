# Professional Website Builder

A web application that allows you to easily create professional websites using AI. With a simple and organized interface, you can specify your project details such as the name, the programming languages you wish to incorporate, the type of website, your specific requirements, and choose your preferred language (Arabic, French, or English). The application generates the necessary code for your website, with the ability to preview and download it.

## How to Use the Application

1. **Select the Application Language**

   - At the top of the page, there's a language selection dropdown. Choose your preferred language from Arabic, French, or English.

2. **Enter Project Details**

   - **Project Name**: Enter a name for your project in the designated field.
   - **Select Programming Languages**: Choose the programming languages you wish to use from the available options (e.g., HTML, CSS, JavaScript, TypeScript, PHP). You can select one or combine multiple languages.
   - **Project Type**: Select the type of website you want to create from the dropdown list (e.g., Business Website, Personal Blog, E-commerce Store, etc.).
   - **Project Requirements**: Enter the details and specific requirements for your website in the text field, such as desired design, functionalities, features, and any other preferences.

3. **Generate the Website Using AI**

   - After entering all the details, click on the "**Generate Website using AI**" button.
   - The application will start processing your request. Please wait until the generation is complete. During this time, a message "Generating..." will appear.

4. **Preview the Website**

   - Once the code generation is complete, a preview of the generated website based on your requirements and selected programming languages will be displayed.
   - You can browse the website within the designated frame to ensure it meets your needs.

5. **Download the Code**

   - If you're satisfied with the generated website, you can download its code.
   - Click on the "**Download Code as ZIP**" button.
   - A ZIP file containing all the necessary files for your website (e.g., index.html, styles.css, script.js, etc.) will be downloaded.

## Notes

- **The clearer the details, the more accurate the results**: Make sure to enter your requirements precisely to get a website that meets your expectations.
- You can **combine multiple programming languages** to create a more dynamic and interactive website.
- You may need to **make additional adjustments** to the code after downloading to further customize the website.
- If you encounter any issues or have questions, feel free to contact us.

## External Services Used

- **ChatGPT API**: Used to generate the code based on the project details you provide, incorporating the selected programming languages.
- **DOMPurify Library**: Used to safely sanitize and display the generated code within the application.
- **FileSaver.js Library**: Used to download the code as a ZIP file to your device.
- **JSZip Library**: Used to create a ZIP file containing all the generated project files.
- **solid-i18n Library**: Used to provide multilingual support, allowing the application to display content in Arabic, French, or English.