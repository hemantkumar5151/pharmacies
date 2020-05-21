var stripe = Stripe('pk_test_cahReNKvg46Mkrj75Mn8l26h00iETVckaO');
import axios from 'axios';
import { showAlert} from './alert';
export const bookTour = async tourId => {
    try {
     const session = await  axios(`/api/v1/bookings/checkout-session/${tourId}`)
     console.log(session)

     stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
    } catch (err) {
      console.log(err);
      showAlert('error', err);
    }
  };
  
