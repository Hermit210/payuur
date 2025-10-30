/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/soluma.json`.
 */
export type Soluma = {
  "address": "CfbfPPJfZVwiiSPSaf67s6eJKnLX3TARiC3MpJGsjWxr",
  "metadata": {
    "name": "soluma",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Soluma Event Platform with MagicBlock Ephemeral Rollups"
  },
  "instructions": [
    {
      "name": "checkInTicket",
      "docs": [
        "Check-in ticket with real-time verification"
      ],
      "discriminator": [
        174,
        66,
        18,
        131,
        231,
        120,
        103,
        246
      ],
      "accounts": [
        {
          "name": "ticket",
          "writable": true
        },
        {
          "name": "organizer",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "getEventStats",
      "docs": [
        "Get real-time event stats"
      ],
      "discriminator": [
        168,
        69,
        58,
        36,
        187,
        20,
        227,
        222
      ],
      "accounts": [
        {
          "name": "event"
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "eventStats"
        }
      }
    },
    {
      "name": "initializeEvent",
      "docs": [
        "Initialize a new event with MagicBlock ER support"
      ],
      "discriminator": [
        126,
        249,
        86,
        221,
        202,
        171,
        134,
        20
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  101,
                  118,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "organizer"
              },
              {
                "kind": "arg",
                "path": "title"
              }
            ]
          }
        },
        {
          "name": "organizer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "priceLamports",
          "type": "u64"
        },
        {
          "name": "capacity",
          "type": "u32"
        },
        {
          "name": "startsAt",
          "type": "i64"
        },
        {
          "name": "endsAt",
          "type": "i64"
        }
      ]
    },
    {
      "name": "purchaseTicket",
      "docs": [
        "Purchase ticket with real-time MagicBlock processing"
      ],
      "discriminator": [
        90,
        91,
        173,
        20,
        72,
        109,
        15,
        146
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "ticket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "event"
              },
              {
                "kind": "account",
                "path": "buyer"
              }
            ]
          }
        },
        {
          "name": "buyer",
          "writable": true,
          "signer": true
        },
        {
          "name": "organizerAccount",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateEventCapacity",
      "docs": [
        "Update event capacity in real-time"
      ],
      "discriminator": [
        132,
        239,
        68,
        101,
        143,
        203,
        121,
        7
      ],
      "accounts": [
        {
          "name": "event",
          "writable": true
        },
        {
          "name": "organizer",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "newCapacity",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "event",
      "discriminator": [
        125,
        192,
        125,
        158,
        9,
        115,
        152,
        233
      ]
    },
    {
      "name": "ticket",
      "discriminator": [
        41,
        228,
        24,
        165,
        78,
        90,
        235,
        200
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "eventSoldOut",
      "msg": "Event is sold out"
    },
    {
      "code": 6001,
      "name": "eventInactive",
      "msg": "Event is not active"
    },
    {
      "code": 6002,
      "name": "ticketAlreadyUsed",
      "msg": "Ticket has already been used"
    },
    {
      "code": 6003,
      "name": "unauthorizedOrganizer",
      "msg": "Unauthorized organizer"
    }
  ],
  "types": [
    {
      "name": "event",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "organizer",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "priceLamports",
            "type": "u64"
          },
          {
            "name": "capacity",
            "type": "u32"
          },
          {
            "name": "ticketsSold",
            "type": "u32"
          },
          {
            "name": "startsAt",
            "type": "i64"
          },
          {
            "name": "endsAt",
            "type": "i64"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "eventStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "ticketsSold",
            "type": "u32"
          },
          {
            "name": "capacity",
            "type": "u32"
          },
          {
            "name": "revenue",
            "type": "u64"
          },
          {
            "name": "isActive",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ticket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "event",
            "type": "pubkey"
          },
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "ticketId",
            "type": "u32"
          },
          {
            "name": "purchaseTime",
            "type": "i64"
          },
          {
            "name": "checkInTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "isUsed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
