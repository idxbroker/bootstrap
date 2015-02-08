lib_path = File.join(File.dirname(__FILE__), 'lib')
$:.unshift(lib_path) unless $:.include?(lib_path)

desc 'Convert less to sass'
task :convert do |t, args|
  require './tasks/converter'
  Converter.new().process_bootstrap
end