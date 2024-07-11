module.exports = {
    ForLoop: {
        Validator: "local A=Inst[OP_A];local Step=Stk[A+2];local Index=Stk[A]+Step;Stk[A]=Index;if Step>0 then if Index<=Stk[A+1] then InstrPoint=InstrPoint+Inst[OP_B];Stk[A+3]=Index;end;elseif Index>=Stk[A+1] then InstrPoint=InstrPoint+Inst[OP_B];Stk[A+3]=Index;end;",
        Mutate: (Instruction) => Instruction.Opcode = 31
    }
}