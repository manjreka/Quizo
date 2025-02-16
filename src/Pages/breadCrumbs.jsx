import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumbs = (props) => {
  const { breadcrumbDetails } = props;
  const { path, text } = breadcrumbDetails;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`${path}`}>DashBoard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{text}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
