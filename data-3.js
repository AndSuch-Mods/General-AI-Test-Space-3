sectionGroups.push(
{
    short: 'Old Core',
    title: '9. Old Core Room',
    questions: [
      q('Identify the owner PLC and exact protocol of the existing Genius remote I/O enclosure.', 'Document the Genius block, Ethernet device/switch, network cabling, and current Oven 4 connection.', true, 'CSI'),
      q('Is the new Weidmüller UR20 rack intended to replace the Genius hardware, operate beside it, or connect to another controller entirely?', '', true, 'CSI'),
      q('Verify whether the handwritten “Oven 4 switch port 24” note is current and whether a usable plant-network port/subnet is available.', '', true, 'Shared'),
      q('Measure the outdoor/indoor route, wall penetrations, enclosure condition, available power, and mounting space.', 'The package’s approximately 80 ft route is reference-only.', true, 'Sky')
    ]
  }
);
sectionGroups.push(
{
    short: 'Oven Pond',
    title: '10. Oven Pond',
    questions: [
      q('Record the exact Oven 4 PLC processor, firmware, Ethernet/protocol modules, and programming-software version.', '', true, 'CSI'),
      q('Can this controller own the specified UR20 PROFINET rack, or is another architecture required?', '', true, 'CSI'),
      q('Are spare analog inputs already available in the Oven 4 rack, and is direct wiring preferred over a new RIO rack?', '', true, 'CSI'),
      q('Confirm whether Oven Pond and Old Core are in the same PLC program/network and whether their work should share hardware or remain separate location quotes.', '', false, 'CSI')
    ]
  }
);
sectionGroups.push(
{
    short: 'High Pressure',
    title: '11. High Pressure Pump Room',
    questions: [
      q('Is the destination the same new Test Press PLC used by LD Test Press option 2?', 'Confirm processor, program, I/O map, and whether both locations can be included in one hardware expansion.', true, 'CSI'),
      q('Does the hydraulic I/O junction box have an approved spare path, terminal capacity, shielding method, and separation from noisy hydraulic/solenoid wiring?', '', true, 'Shared'),
      q('Is a new remote I/O rack required in the pump room, or is the meter signal simply being pulled through to an existing/new analog input in the Test Press panel?', '', true, 'CSI'),
      q('Measure the complete meter-to-hydraulic-box-to-control-panel route and identify all pull points and panel entries.', '', true, 'Sky')
    ]
  }
);
sectionGroups.push(
{
    short: 'Mini Mill',
    title: '12. Mini Mill Water Main',
    questions: [
      q('Identify the Gantry Hot/Coldwell remote I/O platform, owner PLC, firmware, network protocol, and available spare channels.', '', true, 'CSI'),
      q('Measure the complete route from the main meter to the remote I/O panel.', 'This is described as the longest run, and no quotation footage is provided.', true, 'Sky'),
      q('Should the long run be a direct shielded analog cable, a local RIO rack with network/fiber backhaul, or another architecture?', 'Evaluate analog noise/grounding risk, network distance, and access to power before selecting hardware.', true, 'CSI'),
      q('Identify wall penetrations, indoor/outdoor transitions, mounting points, power availability, and any need for fiber or surge protection.', '', true, 'Shared'),
      q('Is this signal owned by the same PLC as the Hot/Coldwell Room meters, and can the work share a rack/program change while still being quoted separately?', '', false, 'CSI')
    ]
  }
);
const sections = sectionGroups;

const photoItems = [
  'Every Seametrics meter face, full nameplate/order code, pipe size, serial number, and display settings',
  'Each meter junction box opened safely: output cable, terminals, splices, power source, and wireless connection',
  'Each wireless transmitter, antenna, receiver/power hardware, associated conduit, and device label',
  'Hot/Coldwell CompactLogix processor label, firmware screen, entire rack, analog module labels, spare terminals, and existing conduit/T-condulet',
  'Melting destination control panel, processor/rack, T-condulet, panel entry, and measured route',
  'LD Test Press option-1 GE CPU364 rack, module labels, network connection, spare I/O, meter J-box, and T-condulet',
  'LD Test Press option-2 new Test Press panel, processor, switch, spare I/O, proposed new box, temporary-cable bypass, and complete route',
  'Old Core Genius remote I/O enclosure, device labels, Ethernet device/switch, handwritten port note, power source, and route',
  'Oven 4 PLC processor/rack labels, network switch/port, spare I/O, panel entry, and Oven Pond route',
  'High Pressure meter J-box, hydraulic I/O J-box interior, cable separation, pull points, and new Test Press panel destination',
  'Mini Mill Main meter, Gantry Hot/Coldwell RIO panel interior, controller/adapter labels, network/power, wall penetrations, and full measured route',
  'Every proposed RIO mounting location with dimensions, clearances, environment, and NEMA requirement',
  'Every available 120 VAC / 24 VDC source, protective device, grounding point, and terminal capacity',
  'Every network switch, port label, IP/subnet information, copper/fiber media, and spare port',
  'Conduit sizes, fill, condition, existing conductors, pull strings, junction boxes, supports, and signal/power separation',
  'Access requirements: lift/scaffold, hot work, outdoor exposure, wall/roof penetrations, production obstructions, and shutdown needs',
  'Measured distance notes for analog cable, network cable, power cable, and conduit at each of the seven separately quoted locations'
];
