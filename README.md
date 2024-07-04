# NMS LIB BACKEND SERVICE CLIENTS

This package will provide a set of Clients to connect and deal with nms backend service

## You will find clients to deal with services related to

### Contentful Data

Base client: GenericNmsServiceClient

- ProductfulClient
- PagefulClient
- AssetRetrieverClient

### CommerceTools Data

BaseClient: BaseCommerceToolsClient

- CustomerClient
- OrderClient

### Cimpress Data

BaseClient: BaseCimpressClient

- CimpressAssetsClient

## Simple usage

```js
const headers: ServiceClientCommonHeaders = {
  "x-cms-id": "giftaCMS",
  "x-tenant-id": "postmanClient",
};

// with default config
const client = new OrderClient(headers);

// with custom config: using directly the config instance
const clientConfig = new OrderClientConfig();
// now you can customize the clientConfig instance using one of its methods, e.g.:
clientConfig.setTargetEnv("dev");
const client = new OrderClient(headers, clientConfig);

// with custom config: using helper method
const clientConfig = customizeClientConfig(new OrderClientConfig(), {
  targetEnv: "dev",
});
const client = new OrderClient(headers, clientConfig);
```

## Full documentation

Confluence documentation page: [click here](https://pixartprinting.atlassian.net/wiki/spaces/PCC/pages/3330834436/NMS+LIB+BACKEND+SERVICE+CLIENTS)
