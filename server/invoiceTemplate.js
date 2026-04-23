module.exports = (data) => {
  return `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 40px;
        color: #333;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .company {
        font-size: 24px;
        font-weight: bold;
      }

      .address {
        text-align: right;
        font-size: 12px;
      }

      h2 {
        margin-top: 40px;
      }

      .info {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
      }

      .info div {
        font-size: 14px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 30px;
      }

      th {
        text-align: left;
        border-bottom: 2px solid #000;
        padding: 10px;
      }

      td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }

      .right {
        text-align: right;
      }

      .totals {
        margin-top: 20px;
        width: 300px;
        float: right;
      }

      .totals div {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
      }

      .bold {
        font-weight: bold;
      }
    </style>
  </head>

  <body>

    <div class="header">
      <div class="company">Netflix Clone</div>
      <div class="address">
        Kochi, India<br/>
        support@netflixclone.com
      </div>
    </div>

    <h2>Invoice</h2>

    <div class="info">
      <div>
        <p><b>Invoice ID:</b> ${data.paymentId}</p>
        <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
        <p><b>Balance Due:</b> ₹${data.price}</p>
      </div>

      <div>
        <p><b>${data.email}</b></p>
        <p>${data.country}</p>
      </div>
    </div>

    <table>
      <tr>
        <th>Item</th>
        <th>Description</th>
        <th class="right">Unit Cost</th>
        <th class="right">Qty</th>
        <th class="right">Line Total</th>
      </tr>

      <tr>
        <td>PLAN</td>
        <td>${data.plan} Subscription</td>
        <td class="right">₹${data.basePrice}</td>
        <td class="right">1</td>
        <td class="right">₹${data.basePrice}</td>
      </tr>
    </table>

    <div class="totals">
      <div>
        <span>Subtotal</span>
        <span>₹${data.basePrice}</span>
      </div>
      <div>
        <span>GST (18%)</span>
        <span>₹${data.gstAmount}</span>
      </div>
      <div class="bold">
        <span>Balance Due</span>
        <span>₹${data.price}</span>
      </div>
    </div>

  </body>
  </html>
  `;
};