import React, { useState, useEffect } from "react";
import axios from "axios";
import xml2js from "xml2js";

const metaDataUrl =
  "https://geo.azmag.gov/arcgis/rest/services/maps/Heat_Relief_Network/MapServer/info/metadata";

export default function LastUpdated() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    axios.get(metaDataUrl).then((response) => {
      xml2js.parseString(response.data, (err, result) => {
        if (err) {
          //Do something
        } else {
          const rawDateString = result.metadata.Esri[0].CreaDate[0];
          const year = rawDateString.slice(0, 4);
          const day = rawDateString.slice(4, 6);
          const month = rawDateString.slice(6, 8);
          setDate(`${day}/${month}/${year}`);
        }
      });
    });
    //
  }, []);

  return (
    <>
      {date && (
        <span className="ml-2">
          {" "}
          - Last Updated: <b>{date}</b>
        </span>
      )}
    </>
  );
}
