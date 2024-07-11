module.exports = {
    SetTable: {
		Validator: "Stk[Inst[OP_A]][Stk[Inst[OP_B]]]=Stk[Inst[OP_C]];",
        Mutate: (Instruction) => Instruction.Opcode = 9
	},
	SetTableB: {
	    Validator: "Stk[Inst[OP_A]][Const[Inst[OP_B]]]=Stk[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 9;
            Instruction.B += 255;
        }
	},
	SetTableC: {
	    Validator: "Stk[Inst[OP_A]][Stk[Inst[OP_B]]]=Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 9;
            Instruction.C += 255;
        }
	},
	SetTableBC: {
	    Validator: "Stk[Inst[OP_A]][Const[Inst[OP_B]]]=Const[Inst[OP_C]];",
        Mutate: (Instruction) => {
            Instruction.Opcode = 9;
            Instruction.B += 255;
            Instruction.C += 255;
        }
	}
}