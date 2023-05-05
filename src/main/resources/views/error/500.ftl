<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>500 - Internal Server Error</title>
  <style>
    body {
      background-color: #f5f5f5;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      color: #333;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }

    .title {
      font-size: 6rem;
      font-weight: bold;
      color: #d32f2f;
      margin-bottom: 0;
      animation: pulse 2s infinite;
    }

    .subtitle {
      font-size: 2rem;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 20px;
      color: #2196f3;
      animation: slideInUp 1s ease;
    }

    .description {
      font-size: 1.2rem;
      margin-bottom: 20px;
      color: #777;
      animation: fadeIn 2s ease;
    }

    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #2196f3;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.2s ease;
      animation: fadeIn 2s ease;
    }

    .btn:hover {
      background-color: #0d8bf0;
    }

    /* Animations */
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes slideInUp {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  </style>
</head>
<body>
<div class="container">
  <h1 class="title">500</h1>
  <h2 class="subtitle">Internal Server Error</h2>
  <p class="description">Oops! Something went wrong on our server. Please try again later.</p>
  <a href="/crm/index" class="btn">Go back to homepage</a>
</div>
</body>
</html>
