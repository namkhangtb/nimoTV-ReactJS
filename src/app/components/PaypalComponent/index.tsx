import * as React from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { environment } from 'app/environments/environment';
export function PaypalComponent() {
  return (
    <div style={{ maxWidth: '750px', minHeight: '200px' }}>
      <PayPalScriptProvider
        options={{
          clientId: `${environment.CLIENT_ID}`,
          components: 'buttons',
          currency: 'USD',
        }}
      >
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const style = { layout: 'vertical' };

  function createOrder() {
    // replace this url with your server
    return fetch(
      'https://react-paypal-js-storybook.fly.dev/api/paypal/create-order',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              sku: '1blwyeo8',
              quantity: 2,
            },
          ],
        }),
      },
    )
      .then(response => response.json())
      .then(order => {
        // Your code here after create the order
        return order.id;
      });
  }
  function onApprove(data) {
    // replace this url with your server
    return fetch(
      'https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      },
    )
      .then(response => response.json())
      .then(orderData => {
        // Your code here after capture the order
      });
  }
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: 'vertical' }}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
};
