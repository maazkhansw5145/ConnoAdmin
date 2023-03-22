import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import Offers from "./Pages/Offers";
import Login from "./Pages/Login";
import AddOffer from "./Pages/AddOffer";
import OfferDetails from "./Pages/OfferDetails";
import OfferEdit from "./Pages/UpdateOffer";
import Instructions from "./Pages/Instructions/Instructions";
import AddInstructions from "./Pages/Instructions/AddInstructions";
import InstructionsDetails from "./Pages/Instructions/InstructionsDetails";
import UpdateInstructions from './Pages/Instructions/UpdateInstructions'
// Layout
import NavBar from "./Layout/NavBar";
import Footer from "./Layout/Footer";
import ProfitTracker from "./Pages/ProfitTracker";
import PremiumUsers from "./Pages/PremiumUsers";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/offers" component={Offers} />
              <Route exact path="/add/offer" component={AddOffer} />
              <Route exact path="/offer/details/:id" component={OfferDetails} />
              <Route exact path="/offer/update/:id" component={OfferEdit} />
              <Route exact path="/profit/tracker" component={ProfitTracker} />
              <Route exact path="/instructions" component={Instructions} />
              <Route
                exact
                path="/add/instructions"
                component={AddInstructions}
              />
              <Route
                exact
                path="/update/instructions/:id"
                component={UpdateInstructions}
              />
              <Route
                exact
                path="/instructions/details/:id"
                component={InstructionsDetails}
              />
               <Route
                exact
                path="/premium/users/"
                component={PremiumUsers}
              />
            </Switch>
            <Footer />
          </Router>
          <ToastContainer />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
