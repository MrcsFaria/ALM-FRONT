import React from 'react';
import { FaixaSuperiorCadLog } from '../../../src/components/BottomBar/BottomBar';
import { FramePag } from '../../../src/components/FramePag/pag';


export default function Pagamento() {
    return (
      <div>
        <FaixaSuperiorCadLog />
        <FramePag />
        {/* Outros componentes */}
      </div>
    );
}