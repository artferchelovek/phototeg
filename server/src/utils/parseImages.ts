import { DiskResponse } from "../controllers/image.controller";

export const getLink = (link: string) => {
  const encodeLink = encodeURIComponent(link);
  return `https://cloud-api.yandex.net/v1/disk/public/resources?public_key=${encodeLink}`;
};

export const extractImages = (response: DiskResponse) => {
  if (!response?._embedded?.items) {
    return [];
  }

  const images = response._embedded.items.filter(
    (item) => item.type === "file",
  );

  return images
    .map((image) => {
      const defaultSize = image.sizes.find(
        (size) => size.name.toUpperCase() === "M",
      );

      return defaultSize ? defaultSize.url : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
};
