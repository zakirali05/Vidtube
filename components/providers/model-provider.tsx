"use client";

import { useState, useEffect } from "react";

import VisitChannel from "../models/visit-channel-model";
import CreateChannel from "../models/create-channel-model";
import DeleteChannel from "../models/delete-channel-model";
import SettingsModel from "../models/settings-model";
import UpgradeModel from "../models/upgrade-model";
const ModelProvider = () => {
  const [ismounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!ismounted) {
    return null;
  }

  return (
    <>
      <CreateChannel />
      <DeleteChannel/>
      <VisitChannel/>
      <SettingsModel/>
      <UpgradeModel/>

    </>
  );
};

export default ModelProvider;
