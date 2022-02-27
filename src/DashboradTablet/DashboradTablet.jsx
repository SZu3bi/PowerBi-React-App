import React, { useEffect, useState } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "./DashboradTablet.scss";
import { PowerBiEnum } from "../Enum/PowerBi.Enum";
import { GetURLSearchParamsMethod } from "../Services/GetURLSearchParamsMethod";
import { TokenMicrosoftAccount } from "../Services/DashboardService";
import { HttpServices } from '../Services/HttpMethod.Helper';


export const DashboradTablet = () => {
  const [tokenapi, settokenapi] = useState();
  const Userid = GetURLSearchParamsMethod('id')

  const GenerateToken = async () => {
    localStorage.removeItem("AccountToken");
    const result = await TokenMicrosoftAccount();
    if (result && result.data.access_token)
      localStorage.setItem(
        "AccountToken",
        JSON.stringify(result && result.data.access_token) || null
      );
    GenerateTokenreport();
  };


  const Filter = {
    $schema: "http://powerbi.com/product/schema#basic",
    target: {
      table: "",
      column: "",
    },
    operator: "In",
    values: [+Userid],
    filterType: models.FilterType.BasicFilter,
    requireSingleSelection: true,
  };

  const GenerateTokenreport = async () => {
    HttpServices.post(PowerBiEnum.powerPI.valueTablet, {
      data: {
        accessLevel: "View",
        allowSaveAs: "false",
      },
    })
      .then((response) => {
        console.log(response);
        settokenapi(response.data.token);
      })
      .catch((error) => {
        console.error(error, "error");
      });
  };

  useEffect(() => {
    GenerateToken();
    // GenerateTokenreport();
    // eslint-disable-next-line
  }, []);

  return (
    <div>


      <div>
        <div style={{ display: "flex", justifyContent: "end" }}></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PowerBIEmbed
            embedConfig={{
              type: "report",
              id:'',
              embedUrl: '',

              accessToken: tokenapi,
              tokenType: models.TokenType.Embed,
              filters: [Filter],
              settings: {
                customLayout: {
                  displayOption: models.DisplayOption.FitToWidth,
                },
                filterPaneEnabled: false,
                navContentPaneEnabled: false,
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
                background: models.BackgroundType.Transparent,
              },
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                [
                  "rendered",
                  function () {
                    console.log("Report rendered");
                  },
                ],
                [
                  "error",
                  function () {
                    //   GenerateToken();
                    //   setTimeout(() => {
                    //     GenerateTokenreport();
                    //   }, 1000);
                  },
                ],
              ])
            }
            cssClassName={"report-style-class"}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </div>
      </div>
    </div>
  );
};
