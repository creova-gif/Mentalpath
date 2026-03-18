import { useState } from 'react';
import { Search, MapPin, Phone, Globe, Mail, Printer, Download, ExternalLink, Heart } from 'lucide-react';

interface Resource {
  id: number;
  name: string;
  type: string;
  description: string;
  phone?: string;
  website?: string;
  email?: string;
  address?: string;
  province: string;
  region?: string;
  culturalFocus?: string[];
  languages?: string[];
  available247?: boolean;
}

const resources: Resource[] = [
  // Ontario - Niagara Region
  {
    id: 1,
    name: 'Distress Centre Niagara',
    type: 'Crisis Support',
    description: '24/7 crisis line and support for anyone experiencing emotional distress, loneliness, or thoughts of suicide.',
    phone: '905-688-3711',
    website: 'https://www.dcniagara.org',
    province: 'ON',
    region: 'Niagara',
    available247: true,
    languages: ['EN', 'FR'],
  },
  {
    id: 2,
    name: 'YMCA Niagara - Immigrant Services',
    type: 'Newcomer Support',
    description: 'Settlement services, employment support, language classes, and community connections for newcomers.',
    phone: '905-646-7660',
    website: 'https://www.ymcaniagara.org',
    address: '61 St. Paul St, St. Catharines, ON',
    province: 'ON',
    region: 'Niagara',
    culturalFocus: ['Newcomer', 'Refugee'],
    languages: ['EN', 'FR', 'AR', 'ES'],
  },
  {
    id: 3,
    name: 'Niagara Regional Native Centre',
    type: 'Cultural Organization',
    description: 'Programs and services for Indigenous peoples including counseling, cultural activities, and community support.',
    phone: '905-684-5603',
    website: 'https://www.nrnc.ca',
    address: '295 Fourth Ave, St. Catharines, ON',
    province: 'ON',
    region: 'Niagara',
    culturalFocus: ['Indigenous'],
    languages: ['EN'],
  },
  {
    id: 4,
    name: 'Prideline Niagara',
    type: 'LGBTQ+ Support',
    description: 'Peer support line and community resources for LGBTQ+ individuals and their allies.',
    phone: '905-684-1118',
    website: 'https://www.pridelineniagara.com',
    province: 'ON',
    region: 'Niagara',
    culturalFocus: ['LGBTQ+'],
    languages: ['EN', 'FR'],
  },
  {
    id: 5,
    name: 'Folk Arts Multicultural Centre',
    type: 'Cultural Organization',
    description: 'Settlement services, cultural programs, and support for racialized and newcomer communities.',
    phone: '905-685-6589',
    website: 'https://www.folkarts.ca',
    address: '85 Church St, St. Catharines, ON',
    province: 'ON',
    region: 'Niagara',
    culturalFocus: ['Newcomer', 'Racialized Communities'],
    languages: ['EN', 'FR', 'AR', 'ES', 'ZH'],
  },

  // Ontario - Toronto
  {
    id: 6,
    name: 'Across Boundaries',
    type: 'Mental Health Services',
    description: 'Ethno-racial mental health and addictions services with culturally-responsive care.',
    phone: '416-787-3007',
    website: 'https://www.acrossboundaries.ca',
    province: 'ON',
    region: 'Toronto',
    culturalFocus: ['Racialized Communities', 'Newcomer'],
    languages: ['EN', 'AR', 'SO', 'TI'],
  },
  {
    id: 7,
    name: 'The 519',
    type: 'LGBTQ+ Support',
    description: 'Community centre providing programs, counseling, and support for LGBTQ+ communities.',
    phone: '416-392-6874',
    website: 'https://www.the519.org',
    address: '519 Church St, Toronto, ON',
    province: 'ON',
    region: 'Toronto',
    culturalFocus: ['LGBTQ+'],
    languages: ['EN', 'FR'],
  },
  {
    id: 8,
    name: 'COSTI Immigrant Services',
    type: 'Newcomer Support',
    description: 'Settlement, employment, language training, and mental health support for immigrants and refugees.',
    phone: '416-658-1600',
    website: 'https://www.costi.org',
    province: 'ON',
    region: 'Toronto',
    culturalFocus: ['Newcomer', 'Refugee'],
    languages: ['EN', 'IT', 'ES', 'AR', 'ZH', 'UR', 'FA'],
  },
  {
    id: 9,
    name: 'Anishnawbe Health Toronto',
    type: 'Indigenous Services',
    description: 'Holistic health services for Indigenous communities including traditional healing and counseling.',
    phone: '416-360-0486',
    website: 'https://www.aht.ca',
    province: 'ON',
    region: 'Toronto',
    culturalFocus: ['Indigenous'],
    languages: ['EN', 'OJ'],
  },
  {
    id: 10,
    name: 'Youthlink',
    type: 'Youth Support',
    description: 'Mental health and crisis support for youth ages 12-29, including walk-in counseling.',
    phone: '416-924-2100',
    website: 'https://www.youthlink.ca',
    province: 'ON',
    region: 'Toronto',
    culturalFocus: ['Youth'],
    languages: ['EN', 'FR'],
  },

  // Ontario - Ottawa
  {
    id: 11,
    name: 'Ottawa Distress Centre',
    type: 'Crisis Support',
    description: '24/7 crisis and suicide prevention line serving Ottawa and surrounding areas.',
    phone: '613-238-3311',
    website: 'https://www.dcottawa.on.ca',
    province: 'ON',
    region: 'Ottawa',
    available247: true,
    languages: ['EN', 'FR'],
  },
  {
    id: 12,
    name: 'Catholic Centre for Immigrants',
    type: 'Newcomer Support',
    description: 'Settlement services, employment programs, and community support for newcomers.',
    phone: '613-232-9634',
    website: 'https://www.cciottawa.ca',
    province: 'ON',
    region: 'Ottawa',
    culturalFocus: ['Newcomer', 'Refugee'],
    languages: ['EN', 'FR', 'AR', 'SO'],
  },

  // British Columbia
  {
    id: 13,
    name: 'Crisis Centre BC',
    type: 'Crisis Support',
    description: '24/7 crisis line providing emotional support and suicide intervention services.',
    phone: '1-800-784-2433',
    website: 'https://crisiscentre.bc.ca',
    province: 'BC',
    available247: true,
    languages: ['EN'],
  },
  {
    id: 14,
    name: 'DIVERSEcity Community Resources Society',
    type: 'Newcomer Support',
    description: 'Settlement, employment, and integration services for immigrants and refugees in Metro Vancouver.',
    phone: '604-597-0205',
    website: 'https://www.dcrs.ca',
    province: 'BC',
    region: 'Vancouver',
    culturalFocus: ['Newcomer', 'Refugee'],
    languages: ['EN', 'ZH', 'PA', 'HI', 'AR'],
  },
  {
    id: 15,
    name: 'Qmunity',
    type: 'LGBTQ+ Support',
    description: 'BC\'s LGBTQ+ resource centre providing counseling, support groups, and community programs.',
    phone: '604-684-5307',
    website: 'https://qmunity.ca',
    province: 'BC',
    region: 'Vancouver',
    culturalFocus: ['LGBTQ+'],
    languages: ['EN'],
  },

  // Alberta
  {
    id: 16,
    name: 'Distress Centre Calgary',
    type: 'Crisis Support',
    description: '24/7 crisis support, suicide prevention, and community referrals.',
    phone: '403-266-4357',
    website: 'https://www.distresscentre.com',
    province: 'AB',
    region: 'Calgary',
    available247: true,
    languages: ['EN'],
  },
  {
    id: 17,
    name: 'Centre for Newcomers',
    type: 'Newcomer Support',
    description: 'Settlement, employment, and integration services for immigrants and refugees in Calgary.',
    phone: '403-569-3325',
    website: 'https://www.centrefornewcomers.ca',
    province: 'AB',
    region: 'Calgary',
    culturalFocus: ['Newcomer', 'Refugee'],
    languages: ['EN', 'AR', 'ZH', 'FR', 'SO'],
  },
  {
    id: 18,
    name: 'Support Network',
    type: 'Crisis Support',
    description: '24/7 distress line and suicide prevention for Northern Alberta.',
    phone: '780-482-4357',
    website: 'https://www.supportnetwork.ca',
    province: 'AB',
    region: 'Edmonton',
    available247: true,
    languages: ['EN'],
  },

  // Quebec
  {
    id: 19,
    name: 'Tel-Aide',
    type: 'Crisis Support',
    description: 'Listening and support service for anyone in distress (French and English).',
    phone: '514-935-1101',
    website: 'https://www.tel-aide.org',
    province: 'QC',
    region: 'Montreal',
    available247: true,
    languages: ['FR', 'EN'],
  },
  {
    id: 20,
    name: 'AGIR - Action LGBTQ+ avec immigrant-es et réfugié-es',
    type: 'LGBTQ+ Support',
    description: 'Support for LGBTQ+ immigrants and refugees in Quebec.',
    phone: '514-934-4096',
    website: 'https://www.agirmontreal.org',
    province: 'QC',
    region: 'Montreal',
    culturalFocus: ['LGBTQ+', 'Newcomer', 'Refugee'],
    languages: ['FR', 'EN', 'ES', 'AR'],
  },
  {
    id: 21,
    name: 'PROMIS',
    type: 'Newcomer Support',
    description: 'Settlement and integration services for immigrants in Montreal.',
    phone: '514-342-2111',
    website: 'https://www.promis.qc.ca',
    province: 'QC',
    region: 'Montreal',
    culturalFocus: ['Newcomer', 'Refugee'],
    languages: ['FR', 'EN', 'AR', 'ES'],
  },

  // Nova Scotia
  {
    id: 22,
    name: 'Mental Health Crisis Line',
    type: 'Crisis Support',
    description: '24/7 mental health crisis support for Nova Scotia.',
    phone: '1-888-429-8167',
    website: 'https://www.nsha.ca',
    province: 'NS',
    available247: true,
    languages: ['EN', 'FR'],
  },
  {
    id: 23,
    name: 'ISANS - Immigrant Services Association of Nova Scotia',
    type: 'Newcomer Support',
    description: 'Settlement, employment, and community integration services for newcomers.',
    phone: '902-423-3607',
    website: 'https://www.isans.ca',
    province: 'NS',
    region: 'Halifax',
    culturalFocus: ['Newcomer', 'Refugee'],
    languages: ['EN', 'AR', 'FR'],
  },

  // Manitoba
  {
    id: 24,
    name: 'Klinic Crisis Line',
    type: 'Crisis Support',
    description: '24/7 crisis support and suicide prevention for Manitoba.',
    phone: '204-786-8686',
    website: 'https://www.klinic.mb.ca',
    province: 'MB',
    region: 'Winnipeg',
    available247: true,
    languages: ['EN'],
  },
  {
    id: 25,
    name: 'Rainbow Resource Centre',
    type: 'LGBTQ+ Support',
    description: 'Programs and support for LGBTQ+ communities in Manitoba.',
    phone: '204-474-0212',
    website: 'https://www.rainbowresourcecentre.org',
    province: 'MB',
    region: 'Winnipeg',
    culturalFocus: ['LGBTQ+'],
    languages: ['EN'],
  },

  // National Resources
  {
    id: 26,
    name: 'Canada Suicide Prevention Service',
    type: 'Crisis Support',
    description: 'National 24/7 suicide prevention line available by phone or text.',
    phone: '1-833-456-4566',
    website: 'https://www.crisisservicescanada.ca',
    province: 'National',
    available247: true,
    languages: ['EN', 'FR'],
  },
  {
    id: 27,
    name: 'Hope for Wellness Helpline',
    type: 'Indigenous Services',
    description: 'National helpline for Indigenous peoples offering immediate mental health counseling and crisis intervention.',
    phone: '1-855-242-3310',
    website: 'https://www.hopeforwellness.ca',
    province: 'National',
    available247: true,
    culturalFocus: ['Indigenous'],
    languages: ['EN', 'FR', 'CR', 'OJ', 'IN'],
  },
  {
    id: 28,
    name: 'Trans Lifeline',
    type: 'LGBTQ+ Support',
    description: 'Peer support hotline staffed by trans people for trans and questioning individuals.',
    phone: '1-877-330-6366',
    website: 'https://translifeline.org',
    province: 'National',
    culturalFocus: ['LGBTQ+'],
    languages: ['EN', 'FR', 'ES'],
  },
  {
    id: 29,
    name: 'Kids Help Phone',
    type: 'Youth Support',
    description: '24/7 support for youth by phone, text, or live chat.',
    phone: '1-800-668-6868',
    website: 'https://kidshelpphone.ca',
    province: 'National',
    available247: true,
    culturalFocus: ['Youth'],
    languages: ['EN', 'FR'],
  },
  {
    id: 30,
    name: 'Black Youth Helpline',
    type: 'Youth Support',
    description: 'Professional counseling and referrals for Black youth across Canada.',
    phone: '1-833-294-8650',
    website: 'https://blackyouth.ca',
    province: 'National',
    culturalFocus: ['Youth', 'Racialized Communities'],
    languages: ['EN', 'FR'],
  },
];

const provinces = [
  { code: 'all', name: 'All Provinces' },
  { code: 'National', name: 'National Resources' },
  { code: 'ON', name: 'Ontario' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'AB', name: 'Alberta' },
  { code: 'QC', name: 'Quebec' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'YT', name: 'Yukon' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
];

const resourceTypes = [
  { id: 'all', name: 'All Types' },
  { id: 'crisis', name: 'Crisis Support' },
  { id: 'newcomer', name: 'Newcomer Support' },
  { id: 'lgbtq', name: 'LGBTQ+ Support' },
  { id: 'indigenous', name: 'Indigenous Services' },
  { id: 'youth', name: 'Youth Support' },
  { id: 'cultural', name: 'Cultural Organizations' },
  { id: 'mental-health', name: 'Mental Health Services' },
];

const culturalCategories = [
  { id: 'all', name: 'All Communities', color: 'bg-gray-100 text-gray-700' },
  { id: 'Newcomer', name: 'Newcomer', color: 'bg-[#E1F5EE] text-[#085041]' },
  { id: 'Refugee', name: 'Refugee', color: 'bg-[#E6F1FB] text-[#0C447C]' },
  { id: 'LGBTQ+', name: 'LGBTQ+', color: 'bg-[#EEEDFE] text-[#3C3489]' },
  { id: 'Indigenous', name: 'Indigenous', color: 'bg-[#FAEEDA] text-[#633806]' },
  { id: 'Youth', name: 'Youth', color: 'bg-[#FAECE7] text-[#712B13]' },
  { id: 'Racialized Communities', name: 'Racialized Communities', color: 'bg-[#FBEAF0] text-[#72243E]' },
];

export function Resources() {
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCulturalFocus, setSelectedCulturalFocus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedResource, setExpandedResource] = useState<number | null>(null);

  const filteredResources = resources.filter(resource => {
    const matchesProvince = selectedProvince === 'all' || resource.province === selectedProvince;
    const matchesType = selectedType === 'all' || 
      (selectedType === 'crisis' && resource.type === 'Crisis Support') ||
      (selectedType === 'newcomer' && resource.type === 'Newcomer Support') ||
      (selectedType === 'lgbtq' && resource.type === 'LGBTQ+ Support') ||
      (selectedType === 'indigenous' && resource.type === 'Indigenous Services') ||
      (selectedType === 'youth' && resource.type === 'Youth Support') ||
      (selectedType === 'cultural' && resource.type === 'Cultural Organization') ||
      (selectedType === 'mental-health' && resource.type === 'Mental Health Services');
    const matchesCultural = selectedCulturalFocus === 'all' || 
      resource.culturalFocus?.includes(selectedCulturalFocus);
    const matchesSearch = searchQuery === '' || 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesProvince && matchesType && matchesCultural && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8 no-print">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#2C3E35] mb-2">Community Resources</h1>
            <p className="text-sm sm:text-base text-gray-600">Canadian mental health and community support resources for client referrals</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#4a7c6f] text-white rounded-lg hover:bg-[#3d6b5f] transition-colors w-full sm:w-auto"
          >
            <Printer className="w-4 h-4" />
            Print List
          </button>
        </div>

        {/* PHIPA Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">PHIPA-Compliant Resource Directory</h3>
              <p className="text-xs sm:text-sm text-blue-800">
                All resources listed are Canadian organizations. This directory is for reference only - 
                resource referrals are not tracked unless you manually add them to session notes.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources by name, type, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c6f] text-sm sm:text-base"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Province Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Province/Territory</label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c6f] text-sm"
            >
              {provinces.map(province => (
                <option key={province.code} value={province.code}>{province.name}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c6f] text-sm"
            >
              {resourceTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          {/* Cultural Focus Filter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Focus</label>
            <select
              value={selectedCulturalFocus}
              onChange={(e) => setSelectedCulturalFocus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c6f] text-sm"
            >
              {culturalCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cultural Category Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {culturalCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCulturalFocus(category.id)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCulturalFocus === category.id
                  ? category.color
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Resource List */}
      <div className="space-y-4">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm sm:text-base">No resources found matching your criteria</p>
          </div>
        ) : (
          filteredResources.map(resource => (
            <div
              key={resource.id}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow print:break-inside-avoid print:mb-4"
            >
              {/* Resource Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-semibold text-[#2C3E35]">{resource.name}</h3>
                    {resource.available247 && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded flex-shrink-0">
                        24/7
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="px-2 py-1 bg-[#E8F3F0] text-[#4a7c6f] text-xs font-medium rounded">
                      {resource.type}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {resource.province === 'National' ? 'National' : `${resource.province}${resource.region ? ` - ${resource.region}` : ''}`}
                    </span>
                    {resource.culturalFocus && resource.culturalFocus.map(focus => {
                      const category = culturalCategories.find(c => c.id === focus);
                      return category ? (
                        <span key={focus} className={`px-2 py-1 text-xs font-medium rounded ${category.color}`}>
                          {focus}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 mb-4">{resource.description}</p>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resource.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#4a7c6f] flex-shrink-0" />
                    <a href={`tel:${resource.phone}`} className="text-[#4a7c6f] hover:underline break-all">
                      {resource.phone}
                    </a>
                  </div>
                )}
                {resource.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-[#4a7c6f] flex-shrink-0" />
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4a7c6f] hover:underline flex items-center gap-1 truncate"
                    >
                      <span className="truncate">Visit website</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                )}
                {resource.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-[#4a7c6f] flex-shrink-0" />
                    <a href={`mailto:${resource.email}`} className="text-[#4a7c6f] hover:underline break-all">
                      {resource.email}
                    </a>
                  </div>
                )}
                {resource.address && (
                  <div className="flex items-center gap-2 text-sm sm:col-span-2">
                    <MapPin className="w-4 h-4 text-[#4a7c6f] flex-shrink-0" />
                    <span className="text-gray-700">{resource.address}</span>
                  </div>
                )}
              </div>

              {/* Languages */}
              {resource.languages && resource.languages.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Languages: {resource.languages.join(', ')}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}