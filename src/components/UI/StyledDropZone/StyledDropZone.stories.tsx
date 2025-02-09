import { FunctionComponent } from "react";
import { StyledDropZone } from "./StyledDropZone";
import { Button } from "@govtechsg/tradetrust-ui-components";

export default {
  title: "UI/StyledDropZone",
  component: StyledDropZone,
  parameters: {
    componentSubtitle: "StyledDropZone",
  },
};

export const Default: FunctionComponent = () => (
  <StyledDropZone
    dropzoneOptions={{}}
    defaultStyle="bg-white"
    activeStyle="bg-cloud-200"
    fileErrors={[]}
    dropzoneIcon="/upload-icon-dark.png"
  >
    <div className="font-gilroy-bold text-lg text-cloud-800">Drag and drop your file(s) here</div>
    <div className="mt-4">or</div>
    <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 mt-4">Browse File</Button>
  </StyledDropZone>
);

export const DifferentBackgroundColor: FunctionComponent = () => (
  <StyledDropZone
    dropzoneOptions={{}}
    defaultStyle="bg-yellow-50"
    activeStyle="bg-yellow-100"
    fileErrors={[]}
    dropzoneIcon="/upload-icon-dark.png"
  >
    <div className="font-gilroy-bold text-lg text-cloud-800">Drag and drop your file(s) here</div>
    <div className="mt-4">or</div>
    <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 mt-4">Browse File</Button>
  </StyledDropZone>
);

export const DifferentIcons: FunctionComponent = () => (
  <StyledDropZone
    dropzoneOptions={{}}
    defaultStyle="bg-white"
    activeStyle="bg-cloud-200"
    fileErrors={[]}
    dropzoneIcon="/dropzone-graphic.png"
  >
    <div className="font-gilroy-bold text-lg text-cloud-800">Drag and drop your file(s) here</div>
    <div className="mt-4">or</div>
    <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 mt-4">Browse File</Button>
  </StyledDropZone>
);

export const withErrors: FunctionComponent = () => (
  <StyledDropZone
    dropzoneOptions={{}}
    defaultStyle="bg-white"
    activeStyle="bg-cloud-200"
    dropzoneIcon="/upload-icon-dark.png"
    fileErrors={[new Error("Invalid file error")]}
  >
    <div className="font-gilroy-bold text-lg text-cloud-800">Drag and drop your file(s) here</div>
    <div className="mt-4">or</div>
    <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 mt-4">Browse File</Button>
  </StyledDropZone>
);
