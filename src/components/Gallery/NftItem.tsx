import React from 'react';
import { MetaDataJson, NFTStandard } from '../../common/datatype';
import { Platform } from '../../common/auth';
import { Card, Image } from 'semantic-ui-react';


const NftItem: React.FC<{
  id: number | string;
  uri: string;
  typeId?: number | string;
  metadata: MetaDataJson;
  standard: NFTStandard;
  platform: Platform;
}> = ({ id, uri, typeId, metadata, standard, platform }) => {
  return <Card>
    <Image src={metadata.image} />
    <Card.Content>
      <Card.Header>{metadata.name}</Card.Header>
      <Card.Meta>{platform} {standard}</Card.Meta>
      <Card.Description>{metadata.description}</Card.Description>
    </Card.Content>
    <Card.Content extra></Card.Content>
  </Card>
}