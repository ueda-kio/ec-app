import React from 'react';
import { TextField } from '@material-ui/core';

const TextInput = (props) => {
    return (
        <TextField
            fullWidth={props.fullWidth} // 最大幅にするかどうか
            label={props.label}
            margin='dense'
            multiline={props.multiline} // 複数行
            required={props.required} // 必須
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    );
};

export default TextInput
