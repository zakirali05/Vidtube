"use client";

import { useState, useEffect } from "react";

import VisitChannel from "../models/visit-channel-model";
import CreateChannel from "../models/create-channel-model";
import DeleteChannel from "../models/delete-channel-model";
import SettingsModel from "../models/settings-model";
import UpgradeModel from "../models/upgrade-model";
import TrendingModel from "../models/trending-model";
import UploadVideo from "../models/upload-video";
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
      <TrendingModel/>
      <UploadVideo/>
    </>
  );
};

export default ModelProvider;
