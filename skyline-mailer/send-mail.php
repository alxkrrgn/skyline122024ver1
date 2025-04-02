<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader (for PHPMailer)
require 'vendor/autoload.php';

// Load environment variables (Make sure to install vlucas/phpdotenv)
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Fetch SMTP credentials from .env
$smtpHost = $_ENV['SES_SMTP_HOST'];
$smtpPort = $_ENV['SES_SMTP_PORT'];
$smtpUser = $_ENV['SES_SMTP_USERNAME'];
$smtpPass = $_ENV['SES_SMTP_PASSWORD'];
$fromEmail = $_ENV['EMAIL_FROM'];
$adminEmail = $_ENV['ADMIN_EMAIL'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? 'No Name';
    $email = $_POST['email'] ?? 'No Email';
    $message = $_POST['message'] ?? 'No Message';

    $mail = new PHPMailer(true);
    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUser;
        $mail->Password = $smtpPass;
        $mail->SMTPSecure = 'tls';
        $mail->Port = $smtpPort;

        // Sender & Recipient
        $mail->setFrom($fromEmail, 'Skyline Capital');
        $mail->addAddress($adminEmail, 'Admin');  // Send email to admin

        // Email Content
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "You received a new message:\n\nName: $name\nEmail: $email\nMessage:\n$message";

        // Send the email
        $mail->send();
        echo json_encode(["success" => true, "message" => "Email sent successfully!"]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "error" => "Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request"]);
}
?>
