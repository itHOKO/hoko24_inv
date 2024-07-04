import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

import '@aws-amplify/ui-react/styles.css';
import { Theme, ThemeProvider } from '@aws-amplify/ui-react';

Amplify.configure(outputs);

const theme: Theme = {
  name: 'hoko-theme',
  tokens: {
    colors: {
      primary: {
        10: {
          value: "hsl(203, 36%, 68%)"
        },
        20: {
          value: "hsl(205, 36%, 62%)"
        },
        40: {
          value: "hsl(204, 38%, 49%)"
        },
        60: {
          value: "hsl(204, 64%, 36%)"
        },
        80: {
          value: "hsl(204, 65%, 29%)"
        },
        90: {
          value: "hsl(205, 64%, 22%)"
        },
        100: {
          value: "hsl(204, 63%, 18%)"
        }
      },
      secondary: {
        10: {
          value: "hsl(38, 100%, 81%)"
        },
        20: {
          value: "hsl(38, 98%, 77%)"
        },
        40: {
          value: "hsl(38, 99%, 70%)"
        },
        60: {
          value: "hsl(38, 99%, 62%)"
        },
        80: {
          value: "hsl(38, 60%, 50%)"
        },
        90: {
          value: "hsl(38, 61%, 37%)"
        },
        100: {
          value: "hsl(38, 61%, 31%)"
        }
      }
      },
    },
  };

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
