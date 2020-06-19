import React, { useState, Fragment } from 'react';
import { Form, Popup, Modal, Button } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import { ERCStandard } from '../../common/datatype';
import { toastError } from '../../common/helper';

const CreateAsset: React.FC<{
  inputChange: (key: string) => (e) => void;
  title: string;
  trigger: React.ReactNode;
  submit: Function;
  standard?: ERCStandard;
  onlyDeploy?: boolean;
}> = ({ inputChange, title, trigger, submit, standard, onlyDeploy }) => {
  if (!standard) standard = ERCStandard.erc721
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(undefined);

  const ok = async () => {
    try {
      setLoading(true)
      const receipt = await submit();
      if (receipt) {
        setReceipt(receipt);
      }
    } catch (e) {
      toastError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      size="tiny"
      trigger={<div onClick={() => setOpen(true)}>{trigger}</div>}
      open={open}
      onClose={() => setOpen(false)}
    >
      {receipt ?
        <Fragment>
          <Modal.Header>Transaction Executed</Modal.Header>
          <Modal.Content className="txResultBox">
            <p>Transaction {receipt.transactionHash} has been executed.</p>
            <p>Check out <a href={`https://etherscan.io/tx/${receipt.transactionHash}`} target="_blank">Block explorer</a> and wait for more block confirmations.</p>
          </Modal.Content>
        </Fragment> :
        <Fragment>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content>
            {standard !== ERCStandard.erc1155 || onlyDeploy ?
              <p>You will deploy a new {standard} contract. Make sure <a href="https://metamask.io/" target="_blank">Metamask</a> is available.</p> : null}
            {!onlyDeploy ?
              <Form>
                <Form.Group widths="equal">
                  <Popup
                    position="bottom left"
                    content="A descriptive name of this collection of NFTs"
                    trigger={<Form.Input required fluid width="12" label="COLLECTION NAME" placeholder="Collection Name" onChange={inputChange('collectionName')} />} />
                  <Form.Input required fluid width="12" label="SYMBOL" placeholder="Symbol" onChange={inputChange('symbol')} />
                </Form.Group>
              </Form> : null}
          </Modal.Content>
          <Modal.Actions>
            <Button basic onClick={() => setOpen(false)}>Cancel</Button>
            <Button positive onClick={ok} loading={loading}>Deploy</Button>
          </Modal.Actions>
        </Fragment>
      }
    </Modal>
  )
}

export default CreateAsset;