"use server";

import db from "@/lib/db";
import { REST_METHOD } from "@prisma/client";

export type Request = {
  name: string;
  method: REST_METHOD;
  url: string;
  headers?: string;
  body?: string;
  parameters?: string;
};

export const addRequestToCollection = async (
  collectionId: string,
  value: Request
) => {
  const request = await db.request.create({
    data: {
      collectionId,
      name: value.name,
      method: value.method,
      url: value.url,
      headers: value.headers,
      body: value.body,
      parameters: value.parameters,
    },
  });
  return request;
};

export const saveRequest = async (collectionId: string, value: Request) => {
  const request = await db.request.update({
    where: {
      id: collectionId,
    },
    data: {
      collectionId,
      name: value.name,
      method: value.method,
      url: value.url,
      headers: value.headers,
      body: value.body,
      parameters: value.parameters,
    },
  });
  return request;
};

export const getAllRequestFromCollection = async (collectionId: string) => {
  const requests = await db.request.findMany({
    where: {
      collectionId,
    },
  });
  return requests;
};
