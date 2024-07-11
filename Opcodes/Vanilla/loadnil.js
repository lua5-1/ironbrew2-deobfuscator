module.exports = {
    LoadNil: {
        Validator: "for Idx=Inst[OP_A],Inst[OP_B] do Stk[Idx]=nil;end;",
        Mutate: (Instruction) => Instruction.Opcode = 3
    }
}