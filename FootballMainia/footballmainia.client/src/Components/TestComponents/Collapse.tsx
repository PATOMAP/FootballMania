import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Example() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="dark"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-addPlayer"
                aria-expanded={open}
                className="rounded-circle"
            >
                +
            </Button>
            <Collapse in={open}>
                <div id="example-collapse-addPlayer">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                    labore wes anderson cred nesciunt sapiente ea proident.
                </div>
            </Collapse>
        </>
    );
}

export default Example;