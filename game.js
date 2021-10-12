const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
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
        text: 'test',
        options: [
          {
            text: 'test',
            nextText: 7
          }
        ]
      },
      {
        id: 8,
        text: 'test',
        options: [
          {
            text: 'test',
            nextText: 7
          }
        ]
      },
      {
        id: 9,
        text: 'test',
        options: [
          {
            text: 'test',
            nextText: 7
          }
        ]
      },
      {
        id: 10,
        text: 'test',
        options: [
          {
            text: 'test',
            nextText: 7
          }
        ]
      },
      {
        id: 11,
        text: 'test',
        options: [
          {
            text: 'test',
            nextText: 7
          }
        ]
      },
      {
        id: 12,
        text: 'test',
        options: [
          {
            text: 'test',
            nextText: 7
          }
        ]
      },
]
startGame()