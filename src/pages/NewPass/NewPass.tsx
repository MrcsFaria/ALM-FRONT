import React from 'react';
import { FaixaSuperiorCadLog } from '../../../src/components/BottomBar/BottomBar';
import FrameNewPass from '../../../src/components/FrameNewPass/FrameNewPass';


export default function NewPass() {
    return (
        <div>
            <FaixaSuperiorCadLog />
            <FrameNewPass />
            {/* Outros componentes */}
        </div>
    );
}