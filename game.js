const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(0)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
      optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click',() => selectOption(option))
            optionButtonsElement.appendChild(button)
        }

    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 0,
    text: 'Welcome to The Woods. Only the brave dare enter and only one has ever made it out alive. Do you dare enter?',
    options: [
        {
            text: 'Start',
            nextText: 1
        },
    ]
},
    {
        id: 1,
        text: 'You wake up in an unfamiliar forest surrounded by tall trees. As you are gathering your surroundings, you hear a loud snapping of a twig.',
        options: [
            {
                text: 'Investigate the source of the noise',
                nextText: 2
            },
            {
                text: 'Proceed in the opposite direction',
                nextText: 3
            }
        ]
    },
    {
        id: 2, 
        text: 'You venture forwards and stumble upon a small chipmunk',
        options: [
            {
                text: 'Put Chipmunk in pocket',
                setState: { chipmunk: true},
                nextText: 4
            },
            {
                text: 'Leave Chipmunk alone',
                nextText: 5
              },
              {
                text: 'Kick Chipmunk',
                nextText: 6
              }
        ]

    },
    {
        id: 3,
        text: 'You instantly fall into a punji pit and are impaled by the stakes on impact. You die a slow, painful, miserable death.',
        options: [
            {
              text: 'Restart',
              nextText: -1
            }
          ]
      },
      {
        id: 4,
        text: 'You and your new pal Cornelius Pudge continue forward through the thick forest. After several hours, you decide you both need to rest.',
        options: [
            {
                text: 'Sit against a shaded tree with Corny P nestled on your chest and fall asleep like two snug bugs in a rug.',
                requiredState: (currentState) => currentState.chipmunk,
                nextText: 7
            },
            {
                text: 'Take shelter in a nearby cave',
                requiredState: (currentState) => currentState.chipmunk,
                nextText: 8
              },
              {
                text: 'Decide against the nappy nap and continue on',
                requiredState: (currentState) => currentState.chipmunk,
                nextText: 9
              }
        ]
      },
      
      {
        id: 5,
        text: 'You look around and to your right you see what appears to be a trail under the fallen leaves. You eventually reach an old seemingly abandoned house in the woods.',
        options: [
            {
                text: 'Explore the exterior of the house',
                nextText: 10
            },
            {
                text: 'Knock on the front door',
                nextText: 11
              },
              {
                text: 'Climb through an unlocked window',
                nextText: 12
              }
        ]
      },
      {
        id: 6,
        text: 'While the chipmunk soars through the branches, a bear comes up from behind and mauls you to pieces, ensuring a very painful ending. Animal cruelty is NOT the answer kids.',
        options: [
            {
              text: 'Restart',
              nextText: -1
            }
          ]
      },
      {
        id: 7,
        text: 'You awake from your nap and find that you have been abandoned by Cornelius Pudge (The Deserter)',
        options: [
          {
            text: 'Express your sorrow outwardly and feel the deeppain of losing your only friend, blow your nose on a nearby leaf.',
            requiredState: (currentState) => currentState.chipmunk,
            setState: {chipmunk: false},
            nextText: 5
          },
          {
            text: 'Cry? I am no bebe.',
            requiredState: (currentState) => currentState.chipmunk,
            setState: {chipmunk: false},
            nextText: 13
          },
        ]
      },
      {
        id: 8,
        text: 'You wake up many hours later in desperate need of sustenence',
        options: [
          {
            text: 'Head out now before you get hangry',
            requiredState: (currentState) => currentState.chipmunk,
            nextText: 14
          },
          {
            text: 'Wait until first light',
            requiredState: (currentState) => currentState.chipmunk,
            nextText: 15
          }
        ]
      },
      {
        id: 9,
        text: 'You reach a bridge covered in a thick fog, it sounds like there is a city on the other side although you are unsure how far away or how safe the bridge is. ',
        options: [
          {
            text: 'Check under the bridge to see if you can cross easily',
            requiredState: (currentState) => currentState.chipmunk,
            nextText: 16
          },
          {
            text: 'I am the hero of this journey and I choose to cross this bridge',
            requiredState: (currentState) => currentState.chipmunk,
            nextText: 17
          }
        ]
      },
      {
        id: 10,
        text: 'You venture around back and look around. The back door appears to be slightly ajar and there is a mysterious path surrounded by massive hedges',
        options: [
          {
            text: 'Explore the mysterious path',
            nextText: 18
          },
          {
            text: 'Enter in to the house through the back door.',
            nextText: 19
          },
          {
            text: 'Leave',
            nextText: 20
          }
        ]
      },
      {
        id: 11,
        text: 'There is no answer at the door and it appears as if there is no one inside.',
        options: [
          {
            text: 'Knock again',
            nextText: 21
          },
          {
            text: 'Check if the door is unlocked',
            nextText: 22
          },
          {
            text: 'Explore around back',
            nextText: 10
          },
          {
            text: 'Leave',
            nextText: 20
          }
        ]
      },
      {
        id: 12,
        text: 'Once inside, you look around, you are surrounded by books and books and books... A library!',
        options: [
          {
            text: 'Pick up the closest book',
            nextText: 23
          },
          {
            text: 'Pick up the thickest book',
            nextText: 24
          },
          {
            text: 'Pick up the oldest book',
            nextText: 25
          },
          {
            text: 'Leave Room',
            nextText: 26
          },
        ]
      },
      {
        id: 13,
        text: 'Due to your refusal to feel your pain, you drown internally due to an abnormal amount of saltwater',
        options: [
            {
              text: 'Restart',
              nextText: -1
            }
          ]
      },
      {
        id: 14,
        text: 'You realize you could easily build a fire with surrounding brush if you could locate an animal nearby... or a bush with berries',
        options: [
          {
            text: 'you gonna set fire to that third bar huh',
            nextText: 27
          },
          {
            text: 'berries and CREAM',
            nextText: 28
          }
        ]
      },
      {
        id: 15,
        text: 'You have starved to death. Corny Pudgepants feasts on your remains for several months until eventually perishing as well due to obesity and lack of mobility.',
        options: [
          {
              text: 'Restart',
              nextText: -1
            }
        ]
      },
      { 
        id: 16,
        text: 'You walk around the side of the bridge and as you start to enter the shadowy area, you see a small stout figure.',
        options: [
            {
            text: 'With a puffed chest you call out "who goes there?"',
            requiredState: (currentState) => currentState.chipmunk,
                nextText: 29
          },
          {
            text: 'You scamper back up, dropping Cornelius along the way to brave the bridge.',
            requiredState: (currentState) => currentState.chipmunk,
            setState: {chipmunk: false},
            nextText: 30
        }
        ]
      },
      { 
        id: 17,
        text: 'bridge',
        options: [
            {
                text: '',
                nextText: 1
            }
        ]
      },
      { 
        id: 18,
        text: '',
        options: [
            {
                text: '',
                nextText: 1
            }
        ]
      },
      { 
        id: 19,
        text: '',
        options: [
            {
                text: '',
                nextText: 1
            }
        ]
      },
      { 
        id: 20,
        text: '',
        options: [
            {
                text: '',
                nextText: 1
            }
        ]
      },
      { 
        id: 21,
        text: '',
        options: [
            {
                text: '',
                nextText: 1
            }
        ]
      },
      { 
        id: 22,
        text: '',
        options: [
            {
                text: '',
                nextText: 1
            }
        ]
      },
      { 
        id: 23,
        text: '',
        options: [
            {
                text: '',
                nextText: 1
            }
        ]
      },
]
startGame()