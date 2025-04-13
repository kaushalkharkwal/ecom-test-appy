// utils/ga4.js
import ReactGA from "react-ga4";

export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

export const sendPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const sendEvent = ({ category, action, label, value }) => {
  ReactGA.event({ category, action, label, value });
};
