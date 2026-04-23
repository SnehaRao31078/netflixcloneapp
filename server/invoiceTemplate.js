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
        width: 100%;
        margin-bottom: 20px;
      }

      .header-table {
        width: 100%;
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
        margin-top: 20px;
      }

      .info-table {
        width: 100%;
        margin-top: 20px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
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
        background-color: #f5f5f5;
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
        margin-left: auto;
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

    <!-- HEADER -->
    <table class="header-table">
      <tr>
        <td class="company">Netflix Clone</td>
        <td class="address">
          Kochi, India<br/>
          support@netflixclone.com
        </td>
      </tr>
    </table>

    <h2>Invoice</h2>

    <!-- CUSTOMER INFO -->
    <table class="info-table">
      <tr>
        <td>
          <p><b>Invoice ID:</b> ${data.paymentId}</p>
          <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
          <p><b>Balance Due:</b> ₹${Number(data.price).toFixed(2)}</p>
        </td>
        <td class="right">
          <p><b>${data.email}</b></p>
          <p>${data.country}</p>
        </td>
      </tr>
    </table>

    <!-- TABLE -->
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
        <td class="right">₹${Number(data.basePrice).toFixed(2)}</td>
        <td class="right">1</td>
        <td class="right">₹${Number(data.basePrice).toFixed(2)}</td>
      </tr>
    </table>

    <!-- TOTALS -->
    <div class="totals">
      <div>
        <span>Subtotal</span>
        <span>₹${Number(data.basePrice).toFixed(2)}</span>
      </div>
      <div>
        <span>GST (18%)</span>
        <span>₹${Number(data.gstAmount).toFixed(2)}</span>
      </div>
      <div class="bold">
        <span>Balance Due</span>
        <span>₹${Number(data.price).toFixed(2)}</span>
      </div>
    </div>

  </body>
  </html>
  `;
};