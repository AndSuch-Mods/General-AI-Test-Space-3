sectionGroups.push(
{
    short: 'Sky / Field',
    title: '5. Sky Field Work That Affects CSI',
    questions: [
      q('Measure the actual conduit, analog cable, network cable, and power-cable distance for every location.', 'The package explicitly states its footage is reference-only and not suitable for quotation.', true, 'Sky'),
      q('For every proposed enclosure or rack, confirm mounting space, accessibility, temperature, washdown/corrosion exposure, and required NEMA rating.', 'These conditions determine CSI enclosure and component selection.', true, 'Shared'),
      q('Identify the available 120 VAC / 24 VDC source, breaker or fuse, grounding point, and whether UPS-backed power is required at each new RIO location.', '', true, 'Shared'),
      q('Confirm existing conduit size, fill, condition, grounding, spare capacity, and whether analog/network conductors can use it without violating separation requirements.', '', true, 'Sky'),
      q('Who supplies and terminates copper Ethernet, fiber, media converters, patch cords, and switch configuration?', '', true, 'Shared'),
      q('Define the exact demolition boundary for each wireless system.', 'Identify transmitter, antenna, power supply, wiring, conduit, mounting hardware, and any receiver-side changes. Returned devices should be labeled by location.', true, 'Shared'),
      q('What lifts, scaffolding, hot-work permits, wall penetrations, firestopping, roof/outdoor work, or production restrictions must be carried in each location price?', '', false, 'Sky')
    ]
  }
);
sectionGroups.push(
{
    short: 'Hot/Coldwell',
    title: '6. Hot/Coldwell Room',
    questions: [
      q('Should the two meters use existing spare analog channels in the photographed rack, or is a new 5034 remote I/O rack still required here?', 'The location narrative says only two analog cables are needed, which conflicts with the general RIO-installation language.', true, 'CSI'),
      q('Record the exact CompactLogix processor and existing analog-module catalog numbers, firmware, channel configuration, and number of truly spare channels.', '', true, 'CSI'),
      q('Verify the existing conduit and T-condulet route reaches both meters, has sufficient fill, and contains usable pull paths.', '', true, 'Sky'),
      q('Confirm both meters’ output type, loop-power arrangement, and whether they can share the same destination panel without additional isolation.', '', true, 'Shared')
    ]
  }
);
sectionGroups.push(
{
    short: 'Melting',
    title: '7. Melting',
    questions: [
      q('Which exact control panel and PLC does the referenced T-condulet route lead to?', 'The package shows the route but does not show or identify the destination PLC rack.', true, 'CSI'),
      q('Is CSI expected to add a new RIO rack, add an analog module to the destination rack, or use an existing spare analog channel?', '', true, 'CSI'),
      q('Measure and verify the T-condulet-to-panel path, conduit size, panel entry, and actual analog cable length.', 'The 50 ft conduit / 120 ft cable values are reference-only.', true, 'Sky'),
      q('Are there heat, dust, vibration, or access conditions that change enclosure, cable, or installation requirements?', '', false, 'Shared')
    ]
  }
);
sectionGroups.push(
{
    short: 'LD Test Press',
    title: '8. LD Test Press',
    questions: [
      q('Which route should be quoted: option 1 to the nearby GE rack, option 2 to the new Test Press panel, or both as separate alternatives?', '', true, 'Shared'),
      q('For option 1, can the Series 90-30 CPU364 own the specified UR20 PROFINET rack, or is a gateway / PLC upgrade / alternate I/O platform required?', '', true, 'CSI'),
      q('For option 1, are usable spare analog channels already present in the GE rack, making a new RIO rack unnecessary?', '', true, 'CSI'),
      q('For option 2, identify the new Test Press controller, firmware, available I/O/network capacity, and exact I/O-map location.', '', true, 'CSI'),
      q('Does option 2 include replacing the temporary cabling that bypasses the damaged underground conduit, or only installing conduit that could be used for that future work?', 'Define the boundary so Sky and CSI do not carry an unintended repair scope.', true, 'Shared')
    ]
  }
);
