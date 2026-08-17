const STORAGE_KEY = 'usp-water-rio-walkdown-v1';
const WALKDOWN_DATE = 'Aug 17, 2026';

function q(text, hint = '', critical = false, owner = 'CSI') {
  return { text, hint, critical, owner };
}

const sectionGroups = [];
sectionGroups.push(
{
    short: 'Architecture',
    title: '1. Scope, Architecture & Quote Decisions',
    questions: [
      q('Is a brand-new remote I/O rack required at every listed location, or should we use existing PLC / remote I/O channels wherever the location notes show an existing rack?', 'The scope says to install RIO hardware, while several location notes describe wiring directly to existing analog inputs. Establish the intended architecture location by location.', true, 'CSI'),
      q('Confirm the exact meter count at each location.', 'The package appears to indicate two meters at Hot/Coldwell and one meter at each of the other six locations, for eight total signals. Verify before selecting I/O.', true, 'Shared'),
      q('Does every new RIO rack truly require at least one analog input module, one 24 VDC input module, and one 24 VDC output module even when only a flow signal is presently used?', 'Confirm minimum channel counts, required spare capacity, and whether unused DI/DO modules must still be furnished at all seven locations.', true, 'CSI'),
      q('Which locations are Allen-Bradley, which are GE, and which PLC ultimately owns each flow value?', 'Create a final location-to-controller matrix before pricing.', true, 'CSI'),
      q('Who furnishes each RIO enclosure, 24 VDC power supply, branch protection, terminal blocks, network switch, surge protection, and internal panel wiring?', 'Separate CSI panel supply from Sky field installation and identify anything US Pipe supplies.', true, 'Shared'),
      q('Will each location be quoted as a complete standalone package, and should alternate architectures or routes be shown as separate options?', 'The package requests a separate quote per location. LD Test Press specifically has two proposed routes.', true, 'Shared'),
      q('What is the quote due date, target installation window, and allowable PLC outage / download window for each system?', 'Adding networked I/O or changing hardware configuration can require a controlled download and production outage.', true, 'Shared'),
      q('Are component substitutions allowed when the specified RIO platform is not compatible with the installed controller?', 'Confirm whether CSI should price a controller upgrade, a gateway, a different I/O family, or issue an exception.', true, 'CSI'),
      q('Are drawings, enclosure fabrication, network architecture, and final as-built documentation required as part of CSI’s quote?', '', false, 'CSI'),
      q('Is the goal only to place flow values in the PLC I/O map, or is this part of a larger plant-wide water monitoring system?', 'Clarify whether central collection, reporting, dashboards, alarms, or historian work is expected.', true, 'CSI')
    ]
  }
);
sectionGroups.push(
{
    short: 'PLC / RIO',
    title: '2. PLC, RIO & Network Compatibility',
    questions: [
      q('Record the exact processor catalog number, firmware revision, programming-software version, Ethernet module, and current IP address for every destination PLC.', 'Photograph the controller label and capture the online project information where possible.', true, 'CSI'),
      q('Hot/Coldwell appears to use an older 1769 CompactLogix. Is a PLC upgrade included, or should a remote I/O family compatible with the existing processor be used instead of 5034 PointMax?', 'Rockwell PointMax 5034 requires newer Logix controllers and Studio 5000 v36 or later. Verify the photographed processor before quoting.', true, 'CSI'),
      q('The LD Test Press option-1 rack is a GE Series 90-30 CPU364. What device will act as the PROFINET controller for the specified Weidmüller UR20 coupler?', 'If the CPU cannot own the UR20 directly, confirm whether the intended solution is a PLC upgrade, gateway, different coupler, or use of existing I/O.', true, 'CSI'),
      q('What is the exact architecture of the Old Core “GE remote I/O drop” shown with Genius equipment?', 'Identify the owner PLC, bus/controller modules, existing Ethernet device, and whether the Genius hardware remains or is replaced.', true, 'CSI'),
      q('What is the exact Oven 4 PLC model and network capability?', 'Verify whether it can own the specified UR20 PROFINET rack and what programming software/version is required.', true, 'CSI'),
      q('What controller is installed in the new Test Press control panel used by the LD Test Press option-2 and High Pressure Pump Room routes?', 'Capture model, firmware, spare Ethernet capacity, spare I/O, and program access.', true, 'CSI'),
      q('What controller and remote I/O platform are in the Gantry Hot/Coldwell panel serving the Mini Mill Main route?', '', true, 'CSI'),
      q('Where is the network connection point for each proposed RIO rack, and what switch port, VLAN/subnet, IP address, and naming standard will US Pipe provide?', '', true, 'Shared'),
      q('Will each network run be copper, fiber, or an existing plant-network connection?', 'Measure total network distance, not only the analog field cable. Copper Ethernet distance and plant electrical noise may drive fiber or a local switch.', true, 'Shared'),
      q('Are DLR, MRP, star, linear, or another topology and redundancy level required?', 'Confirm whether dual-port adapters must be used as a ring or only as a two-port switch.', false, 'CSI'),
      q('Are spare controller connection resources, memory, scan time, and network capacity available for the added I/O?', '', false, 'CSI'),
      q('Can the hardware configuration be changed online, or must CSI plan a full download and controlled restart at each PLC?', '', true, 'CSI')
    ]
  }
);
sectionGroups.push(
{
    short: 'Meters',
    title: '3. Seametrics Meter Signal & Wiring',
    questions: [
      q('Photograph and record the full model / order code, size, serial number, power option, and output option for every Seametrics meter.', 'Do not rely only on the generic iMAG 4700P data sheet.', true, 'CSI'),
      q('Does every meter actually have a 4–20 mA output installed and enabled?', 'The iMAG 4700P includes 4–20 mA, but other 4700 configurations can require an option. Verify the exact installed model.', true, 'CSI'),
      q('What signal is the existing wireless transmitter currently using from the meter: 4–20 mA, scaled pulse, serial, or another output?', 'The new hardwired scope assumes analog, but the current wireless system may not prove that analog is available.', true, 'CSI'),
      q('Where will the passive 4–20 mA loop receive 24 VDC power, and does the selected analog input module support the required wiring method?', 'Confirm loop supply, channel isolation, commons, resistance budget, and whether field power is supplied from the RIO panel.', true, 'CSI'),
      q('Is the proper Seametrics power/output cable already installed, long enough, and in reusable condition at every meter?', 'Verify conductor count, cable entry, junction box, splices, and any factory cable-length limitations.', true, 'Shared'),
      q('What flow range and engineering units should correspond to 4 mA and 20 mA for each meter?', 'Capture current GPM range, pipe size, forward/reverse behavior, and display settings.', true, 'CSI'),
      q('Does US Pipe need instantaneous flow only, or must the PLC also receive or calculate totalized flow?', 'An analog input normally represents rate; totalization may require PLC logic or the pulse output.', true, 'CSI'),
      q('What are the shield, drain, grounding, and analog-cable requirements?', 'Confirm one-end shield termination, signal isolation, separation from VFD/power conductors, and cable type with Sky.', false, 'Shared')
    ]
  }
);
sectionGroups.push(
{
    short: 'Programming',
    title: '4. Programming, Scaling & Data Use',
    questions: [
      q('Can US Pipe provide the latest verified program backup for every affected PLC before quotation or at least before work begins?', 'Include Studio 5000 / PAC Machine Edition version, passwords, protected blocks, and upload restrictions.', true, 'CSI'),
      q('Where is the existing I/O Map routine in each program, and what tag/register naming standard should CSI follow?', 'If no map exists, confirm the expected routine name, execution location, and documentation standard.', true, 'CSI'),
      q('What values and status bits must be created for each meter?', 'At minimum consider raw input, scaled flow, bad-signal / overrange / underrange, communication health, and optional totalization.', false, 'CSI'),
      q('Are HMI, SCADA, historian, reporting, or alarm-screen changes required?', 'The written scope only explicitly calls for tags/registers in the PLC I/O map.', true, 'CSI'),
      q('Are high/low flow alarms, zero-flow detection, data logging, or loss-of-signal alarms required, and who provides setpoints?', '', false, 'CSI'),
      q('What final deliverables are required?', 'Confirm commented source programs, network/IP list, I/O list, scaling table, panel drawings, meter settings, loop-check sheets, and as-left backups.', false, 'CSI')
    ]
  }
);
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
